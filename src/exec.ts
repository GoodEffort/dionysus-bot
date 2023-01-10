import { exec as _exec } from 'child_process';
import { promisify } from 'util';

// ew callbacks

export const exec = promisify(_exec);
export default exec;