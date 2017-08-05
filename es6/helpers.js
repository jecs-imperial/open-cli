'use strict';

const fsExtra = require('fs-extra'),
      necessary = require('necessary');

const pathMapsUtilities = require('./utilities/pathMaps');

const { path, fileSystem } = necessary,
      { combinePaths } = path,
      { entryExists, isDirectoryEmpty } = fileSystem;

class helpers {
  static moveEntries(pathMaps, projectsDirectoryPath, callback) {
    const targetPaths = [];

    pathMapsUtilities.asyncForEachWithSourcePathAndTargetPath(
      pathMaps, 
      function(sourcePath, targetPath, next) {
        moveEntry(sourcePath, targetPath, projectsDirectoryPath, function(targetPath) {
          targetPaths.push(targetPath);
          
          next();
        });
      },
      function() {
        callback(targetPaths);
      }
    );
  }

  static removeEntries(pathMaps, projectsDirectoryPath, callback) {
    const targetPaths = [];

    pathMapsUtilities.asyncForEachWithSourcePathAndTargetPath(
      pathMaps,
      function(sourcePath, targetPath, next) {
        removeEntry(sourcePath, targetPath, projectsDirectoryPath, function(targetPath) {
          targetPaths.push(targetPath);

          next();
        });
      },
      function() {
        callback(targetPaths);
      }
    );
  }
}

module.exports = helpers;

function moveEntry(sourcePath, targetPath, projectsDirectoryPath, callback) {
  if (sourcePath === targetPath) {
    callback(targetPath);
  } else {
    const absoluteSourcePath = combinePaths(projectsDirectoryPath, sourcePath),
          exists = entryExists(absoluteSourcePath);

    if (!exists) {
      targetPath = null;

      callback(targetPath);
    } else {
      const entryDirectory = isEntryDirectory(absoluteSourcePath);

      entryDirectory ?
        moveDirectory(sourcePath, targetPath, projectsDirectoryPath, callback) :
          moveFile(sourcePath, targetPath, projectsDirectoryPath, callback);
    }
  }
}

function removeEntry(sourcePath, targetPath, projectsDirectoryPath, callback) {
  if (sourcePath === targetPath) {
    callback(targetPath);
  } else {
    const absoluteSourcePath = combinePaths(projectsDirectoryPath, sourcePath),
          exists = entryExists(absoluteSourcePath);

    if (!exists) {
      targetPath = null;

      callback(targetPath);
    } else {
      const entryDirectory = isEntryDirectory(absoluteSourcePath);

      entryDirectory ?
        removeDirectory(sourcePath, projectsDirectoryPath, callback) :
          removeFile(sourcePath, projectsDirectoryPath, callback);
    }
  }
}

function moveFile(sourcePath, targetPath, projectsDirectoryPath, callback) {
  const absoluteSourcePath = combinePaths(projectsDirectoryPath, sourcePath),
        absoluteTargetPath = combinePaths(projectsDirectoryPath, targetPath);

  fsExtra.move(absoluteSourcePath, absoluteTargetPath, function (err) {
    const success = (err === null);
    
    targetPath = success ?
                   targetPath :
                     sourcePath;

    callback(targetPath);
  });
}

function removeFile(sourcePath, projectsDirectoryPath, callback) {
  const absoluteSourcePath = combinePaths(projectsDirectoryPath, sourcePath);

  fsExtra.remove(absoluteSourcePath, function(err) {
    const success = (err === null),
          targetPath = success ?
                         null :
                           sourcePath;

    callback(targetPath);
  });
}

function moveDirectory(sourcePath, targetPath, projectsDirectoryPath, callback) {
  const absoluteSourcePath = combinePaths(projectsDirectoryPath, sourcePath),
        absoluteTargetPath = combinePaths(projectsDirectoryPath, targetPath),
        empty = isDirectoryEmpty(absoluteSourcePath);

  if (!empty) {
    const targetPath = sourcePath;

    callback(targetPath);
  } else {
    fsExtra.move(absoluteSourcePath, absoluteTargetPath, function (err) {
      const success = (err === null);

      if (success) {
        callback(targetPath);
      } else {
        const errCode = err.code; ///

        if (errCode !== 'EEXIST') {
          const targetPath = sourcePath;

          callback(targetPath);
        } else {
          fsExtra.remove(absoluteSourcePath, function(err) {
            const success = (err === null);

            if (!success) {
              targetPath = sourcePath;
            }

            callback(targetPath);
          });
        }
      }
    });
  }
}

function removeDirectory(sourcePath, projectsDirectoryPath, callback) {
  const absoluteSourcePath = combinePaths(projectsDirectoryPath, sourcePath),
        empty = isDirectoryEmpty(absoluteSourcePath);

  if (!empty) {
    const targetPath = sourcePath;

    callback(targetPath);
  } else {
    fsExtra.remove(absoluteSourcePath, function(err) {
      const success = (err === null),
            targetPath = success ?
                            null :
                              sourcePath;

      callback(targetPath);
    });
  }
}
