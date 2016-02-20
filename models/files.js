/**
 * Created by adrianbadarau on 20/02/16.
 */
Files = new FS.Collection("files", {
    stores: [new FS.Store.FileSystem("files")]
});