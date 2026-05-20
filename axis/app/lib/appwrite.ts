import { Client, Account } from 'appwrite';

export const client = new Client();

client
    .setEndpoint('https://fra.cloud.appwrite.io/v1')
    .setProject('6a0cc31e000b8095a839');

export const account = new Account(client);
export { ID } from 'appwrite';
