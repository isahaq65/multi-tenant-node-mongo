import mongoose from "mongoose";
import { initAdminDbConnection, initTenantDBConnection } from "./initDBConnection.js";
import { getCacheConnection, setCacheConnection } from "./lruCacheManager.js";
import { getATenantRepo } from "../repositories/tenant.js";

let adminDbConnection;

export const connectAllDb = async () => {
    const ADMIN_DB_URI = "your admin db uri";
    adminDbConnection = await initAdminDbConnection(ADMIN_DB_URI);

    const allTenants = await getATenantUserRepo(adminDbConnection, { name: 1, dbUri: 1, _id: 1 });

    for (const tenant of allTenants) {
        const tenantConnection = await initTenantDBConnection(tenant.dbUri, tenant.name);
        setCacheConnection(tenant._id.toString(), tenantConnection);
    }
};

export const getConnectionForTenant = async (tenantId) => {
    console.log(`from cache ${tenantId} `);

    let connection = getCacheConnection(tenantId);

    if (!connection) {
        console.log(`cache miss ${tenantId}`);

        const tenantData = await getATenantRepo(adminDbConnection, { _id: tenantId }, { dbUri: 1, name: 1 });

        if (tenantData) {
            connection = await initTenantDBConnection(tenantData.dbUri, tenantData.name);
            if (!connection) return null;

            console.log("Connection cache added for ", tenantData.name);
        } else {
            console.log("No connection data for tenant with ID", tenantId);
            return null;
        }
    }

    return connection;
};

export const getAdminConnection = () => {
    console.log("adminDbConnection");
    return adminDbConnection;
};

const gracefulShutdown = async () => {
    console.log("Closing all database connections...");

    const connectionArr = getCacheValuesArr();

    for (const connection of connectionArr) {
        await connection.close();
        console.log("Tenant database connection closed.");
    }
    if (adminDbConnection) {
        await adminDbConnection.close();
        console.log("Admin database connection closed.");
    }

    console.log("All database connections closed");
};

let isShutdownInProgress = false;

// Listen for termination signals
["SIGINT", "SIGTERM", "SIGQUIT", "SIGUSR2"].forEach((signal) => {
    process.on(signal, async () => {
        if (!isShutdownInProgress) {
            console.log(`Received ${signal}, gracefully shutting down...`);
            isShutdownInProgress = true;
            await gracefulShutdown();
            process.exit(0);
        }
    });
});
