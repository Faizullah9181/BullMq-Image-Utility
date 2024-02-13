import { Sequelize, SequelizeOptions } from "sequelize-typescript";
import { Op } from "sequelize";
import * as path from "path";
import { ReplicationOptions, ConnectionOptions } from "sequelize/types";
require("dotenv").config();
let options = {} as SequelizeOptions;
options.database = process.env.DB_NAME;
options.models = [path.join(__dirname, "../app/models")];
options.dialect = "mysql";
options.logging = console.log;
options.operatorsAliases = {
  $eq: Op.eq,
  $ne: Op.ne,
  $gte: Op.gte,
  $gt: Op.gt,
  $lte: Op.lte,
  $lt: Op.lt,
  $not: Op.not,
  $in: Op.in,
  $notIn: Op.notIn,
  $is: Op.is,
  $like: Op.like,
  $notLike: Op.notLike,
  $iLike: Op.iLike,
  $notILike: Op.notILike,
  $regexp: Op.regexp,
  $notRegexp: Op.notRegexp,
  $iRegexp: Op.iRegexp,
  $notIRegexp: Op.notIRegexp,
  $between: Op.between,
  $notBetween: Op.notBetween,
  $overlap: Op.overlap,
  $contains: Op.contains,
  $contained: Op.contained,
  $adjacent: Op.adjacent,
  $strictLeft: Op.strictLeft,
  $strictRight: Op.strictRight,
  $noExtendRight: Op.noExtendRight,
  $noExtendLeft: Op.noExtendLeft,
  $and: Op.and,
  $or: Op.or,
  $any: Op.any,
  $all: Op.all,
  $values: Op.values,
  $col: Op.col,
};

options.dialect = "mysql";
options.dialectOptions = {
  ssl: false,
};

options.port = Number(process.env.DB_PORT);
options.logging = false;
options.replication = {} as ReplicationOptions;
let read = {} as ConnectionOptions;
let write = {} as ConnectionOptions;
options.replication.read = [read];
options.replication.write = write;

read.host = process.env.DB_HOST;
read.username = process.env.DB_USER;
read.password = process.env.DB_PASSWORD;

write.host = process.env.DB_HOST;
write.username = process.env.DB_USER;
write.password = process.env.DB_PASSWORD;

let pool = {};
options.pool = pool;
options.retry = {
  match: [
    /ETIMEDOUT/,
    /ECONNRESET/,
    /ECONNREFUSED/,
    /ESOCKETTIMEDOUT/,
    /EHOSTUNREACH/,
    /EPIPE/,
    /EAI_AGAIN/,
    /SequelizeConnectionError/,
    /SequelizeConnectionRefusedError/,
    /SequelizeHostNotFoundError/,
    /SequelizeHostNotReachableError/,
    /SequelizeInvalidConnectionError/,
    /SequelizeConnectionTimedOutError/,
    /SequelizeConnectionAcquireTimeoutError/,
  ],
  max: 3,
};

export const sequelize = new Sequelize(
  process.env.DB_NAME as string,
  process.env.DB_USER as string,
  process.env.DB_PASSWORD,
  options
);
