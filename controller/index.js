import loginService from '../services/auth.js'
import { addATenantService } from '../services/tenant.js';

export const loginController = async (req,res)=>{
  const serviceFnResponse = await loginService

  res.status(serviceFnResponse.code).json({...serviceFnResponse});
}

export const addATenantController = async (req,res)=>{
  const serviceFnResponse = await addATenantService(req.body);

  res.status(serviceFnResponse.code).json({...serviceFnResponse});
}

