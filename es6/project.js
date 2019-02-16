'use strict';

const JSZip = require('jszip'),
      request = require('request');

const Entries = require('./entries');

class Project {
  constructor(name, entries) {
    this.name = name;
    this.entries = entries;
  }

  getName() {
    return this.name;
  }

  getEntries() {
    return this.entries;
  }

  getFiles() { return this.entries.getFiles(); }

  getFilePaths() {
    const files = this.getFiles(),
          filePaths = files.map(function(file) {
            const filePath = file.getPath();

            return filePath;
          });

    return filePaths;
  }

  getDirectories() { return this.entries.getDirectories(); }

  getDirectoryPaths() {
    const directories = this.getDirectories(),
          directoryPaths = directories.map(function(directory) {
            const directoryPath = directory.getPath();

            return directoryPath;
          });

    return directoryPaths;
  }

  toJSON() {
    const name = this.name,
          entriesJSON = this.entries.toJSON(),
          entries = entriesJSON,  ///
          json = {
            "name": name,
            "entries": entries
          };

    return json;
  }

  static fromJSON(json) {
    const nameJSON = json["name"],
          entriesJSON = json["entries"];

    json = entriesJSON; ///

    const name = nameJSON,  ///
          entries = Entries.fromJSON(json),
          project = new Project(name, entries);

    return project;
  }

  static fromURL(url, callback) {
    const method = 'GET',
          encoding = null,
          options = {
            url,
            method ,
            encoding
          };

    request(options, function(error, response) {
      const { statusCode } = response;

      error = error || (statusCode !== 200);  ///

      if (error) {
        const project = null;

        callback(project);

        return;
      }

      const { body } = response;

      JSZip.loadAsync(body)
        .then(function(jsZip) {
          Project.fromJSZip(jsZip, callback);
        });
    });
  }

  static fromJSZip(jsZip, callback) {
    Entries.fromJSZip(jsZip, function(entries) {
      let project = null;

      const topmostDirectoryName = entries.getTopmostDirectoryName();

      if (topmostDirectoryName !== null) {
        const name = topmostDirectoryName;  ///
        
        project = new Project(name, entries);
      }

      callback(project);
    });
  }

  static fromTopmostDirectoryName(topmostDirectoryName, projectsDirectoryPath, loadOnlyRecognisedFiles, doNotLoadHiddenFilesAndDirectories) {
    const entries = Entries.fromTopmostDirectoryName(topmostDirectoryName, projectsDirectoryPath, loadOnlyRecognisedFiles, doNotLoadHiddenFilesAndDirectories),
          project = new Project(topmostDirectoryName, entries);

    return project;
  }
}

module.exports = Project;
