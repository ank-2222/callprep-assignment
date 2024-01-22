import { Pool } from "pg";
// @ts-ignore
import { format, buildWhereFromQuery, transformer } from "sqlutils/pg";
import dotenv from "dotenv";
dotenv.config();
import logger, { LogTypes } from "../utils/logger";
const config = {
	user: process.env.POSTGRES_USER,
	password: process.env.POSTGRES_PASSWORD,
	host: process.env.POSTGRES_HOST,
	database: process.env.POSTGRES_DATABASE,
	port: parseInt(String(process.env.POSTGRES_PORT)),
	ssl: {
		rejectUnauthorized: false, // Use this line if you face self-signed certificate issues
	},
	sslmode: "require",
};

let pool: Pool;

try {
	pool = new Pool(config);
} catch (err: any) {
	logger(
		`Error while connecting to the database: ${
			err ? err.message ?? JSON.stringify(err) : "No error"
		}`,
		LogTypes.CUSTOM_OBJ
	);
}

export default {
	async query(text: any, params?: any) {
		try {
			// text = text.replace(/\n/g, "");
			const res = await pool.query(text, params);
			return res;
		} catch (err: any) {
			logger(
				`Error while executing query: ${
					err ? err.message ?? JSON.stringify(err) : "No error"
				}`,
				LogTypes.CUSTOM_OBJ
			);
			return err as Error;
		}
	},
	format,
	buildWhereFromQuery,
	transformer,
};
