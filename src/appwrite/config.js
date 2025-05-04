import config from "../config";

import { Client, Account, ID, Databases, Storage, Query } from "appwrite";

export class DatabaseService {
    client = new Client();
    databases,
    storage

    constructor(){
        this.client
              .setEndpoint(config.appwriteUrl)
              .setProject(config.appwriteProjectId);

        this.databases = new Databases(client);
        this.storage = new Storage(client);
    }

    async createPost({title, slug, content, featuredImage, status, userId}){
        try{
            return await this.databases.createDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId
                }
            )
        }
        catch(error){
            console.log('error creating post', error);
        }
    }

    async updatePost(slug, {title, content, featuredImage, status}){
        try{
            return await this.databases.updateDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status
                }
            )
        }
        catch(error){
            console.log('error updating post', error);
        }
    }

    async deletePost(slug){
        try{
            await this.databases.deleteDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug
            )
            return true;
        }
        catch(error){
            console.log('error deleting post', error);
            return false;
        }
    }

    async getPost(slug){
        try{
            return await this.databases.getDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug
            )
        }
        catch(error){
            console.log('error getting post', error);
            return false
        }
    }

    async getPosts(queries = [Query.equal('status','active')]){
        try{
            return await this.databases.listDocuments(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                queries,
            )
        }
        catch(error){
            console.log('error getting posts', error);
            return false
        }
    }

    // file upload services
    async uploadFile(file){
        try{
            return await this.storage.createFile(
                config.appwriteBucketId,
                ID.unique(),
                file
            )
        }
        catch(error){
            console.log('error uploading file', error);
            return false;
        }
    }

    async deleteFile(fileId){
        try{
            await this.storage.deleteFile(
                config.appwriteBucketId,
                fileId
            )
            return true;
        }
        catch(error){
            console.log('error deleting file', error);
            return false;
        }
    }

    getFilePreviewURL(fileId){
        try{
            return this.storage.getFilePreview(
                config.appwriteBucketId,
                fileId,
            )
        }
        catch(error){
            console.log('error getting file preview', error);
            return false;
        }
    }
}

const databaseService = new DatabaseService();

export default databaseService;
