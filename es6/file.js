'use strict';

const mkdirp = require('mkdirp'),
      necessary = require('necessary');

const nameUtilities = require('./utilities/name');

const { pathUtilities, fileSystemUtilities } = necessary,
      { readFile, writeFile, isEntryFile } = fileSystemUtilities,
      { removeMasterDirectoryNameFromPath } = nameUtilities,
      { concatenatePaths, topmostDirectoryPathFromPath } = pathUtilities;

class File {
  constructor(path, content) {
    this.path = path;
    this.content = content;
  }

  getPath() {
    return this.path;
  }

  getContent() {
    return this.content;
  }

  isFile() {
    const file = true;

    return file;
  }

  isDirectory() {
    const directory = false;

    return directory;
  }

  setPath(path) {
    this.path = path;
  }

  setContent(content) {
    this.content = content;
  }

  convertTabsToWhitespace() {
    this.content = this.content.replace(/\t/g, '  ');  ///
  }

  save(projectsDirectoryPath) {
    const absolutePath = concatenatePaths(projectsDirectoryPath, this.path),  ///
          topmostAbsoluteDirectoryPath = topmostDirectoryPathFromPath(absolutePath);

    mkdirp.sync(topmostAbsoluteDirectoryPath);

    writeFile(absolutePath, this.content);
  }

  toJSON() {
    const { type } = File,
          path = this.path,
          content = this.content,
          json = {
            "type": type,
            "path": path,
            "content": content
          };

    return json;
  }

  static fromJSON(json) {
    let file = null;

    const { type } = File,
          typeJSON = json["type"];

    if (typeJSON === type) {  ///
      const pathJSON = json["path"],
            contentJSON = json["content"],
            path = pathJSON,  ///
            content = contentJSON;  ///

      file = new File(path, content);
    }

    return file;
  }

  static fromPath(path, projectsDirectoryPath) {
    let file = null;

    const absolutePath = concatenatePaths(projectsDirectoryPath, path),
          entryFile = isEntryFile(absolutePath);

    try {
      if (entryFile) {
        const content = readFile(absolutePath);

        file = new File(path, content);
      }
    } catch (error) {}  ///

    return file;
  }

  static fromDocument(document) {
    const filePath = document.getFilePath(),
          content = document.getContent(),
          path = filePath,  ///
          file = new File(path, content);

    return file;
  }

  static fromJSZipEntry(jsZipEntry, callback) {
    let file = null;
    
    const { dir } = jsZipEntry,
          jsZipEntryDirectory = dir,  ///
          jsZipEntryFile = !jsZipEntryDirectory;  ///

    if (!jsZipEntryFile) {
      callback(file);

      return;
    }

    const jsZipFile = jsZipEntry,  ///
          { name } = jsZipFile;

    let path = name; ///

    path = removeMasterDirectoryNameFromPath(path);

    jsZipEntry.async('string').then(function(content) {
      file = new File(path, content);

      callback(file);
    });
  }
}

const type = 'File';

Object.assign(File, {
  type
});

module.exports = File;
