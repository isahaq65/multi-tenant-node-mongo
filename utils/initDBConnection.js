import mongoose from "mongoose";
import tenantSchema from "../schema/tenant.js";
import tenantUserSchema from "../schema/tenantUser.js";

const clientOption = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

const initAdminDbConnection = async (DB_URL) => {
    try {
        const db = mongoose.createConnection(DB_URL, clientOption);
        db.on("error", (err) => {
            console.log("Admin db error : ", err);
        });

        db.once("open", () => {
            console.log("Admin client MongoDB Connection ok!");
        });

        await db.model("tenants", tenantSchema);
        await db.model("tenantusers", tenantUserSchema);

        return db;
    } catch (err) {
        return err;
    }
};

const initTenantDBConnection = async (DB_URL, dbName) => {
    try {
        const db = mongoose.createConnection(DB_URL, clientOption);

        db.on("error", (err) => console.log(`Tenant ${dbName} db error: `, err));

        db.once("open", () => {
            console.log(`${dbName} DB Connection ok!`);
        });

        await db.model("users", UserSchema);

        return db;
    } catch (error) {
        return error;
    }
};
export { initAdminDbConnection, initTenantDBConnection };
