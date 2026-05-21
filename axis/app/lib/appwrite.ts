import { Client, Account, TablesDB, Databases } from 'appwrite';

export const client = new Client();

export const tablesDB = new TablesDB(client);

client
    .setEndpoint('https://fra.cloud.appwrite.io/v1')
    .setProject('6a0cc31e000b8095a839');

export const account = new Account(client);
export const databases = new Databases(client);
export { ID } from 'appwrite';
