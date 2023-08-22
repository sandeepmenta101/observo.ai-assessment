import { useState, useEffect } from "react";

import data from "../data.json";
import FileOrFolder from "./FileOrFolder";

export default function FileExplorer() {
  const [rootFolders, setRootFolders] = useState([]);

  useEffect(() => {
    const folders = data.filter((file) => {
      if (!file.parent && file.isDir) {
        return { ...file, isActive: false };
      }
    });
    setRootFolders(folders);
  }, []);

  const toggleFolder = (selectedFolder) => {
    const subFolders = data.filter((file) => {
      if (selectedFolder.id === file.parent) {
        return file;
      }
    });
    const subFoldersData = subFolders.map((subFolder) => {
      if (subFolder.isDir) {
        return { ...subFolder, isActive: false, children: [] };
      }
      return subFolder;
    });
    const folders = [...rootFolders].map((folder) => {
      if (selectedFolder.id === folder.id) {
        return {
          ...folder,
          isActive: !folder.isActive,
          children: !folder.isActive ? [...subFoldersData] : [],
        };
      }
      if (selectedFolder.parent === folder.id) {
        return {
          ...folder,
          children: folder.children.map((child) => {
            if (child.id === selectedFolder.id) {
              return {
                ...child,
                isActive: !child.isActive,
                children: !child.isActive ? [...subFoldersData] : [],
              };
            }
            return child;
          }),
        };
      }
      return folder;
    });
    setRootFolders(folders);
  };

  return (
    <>
      <div className="file-explorer">
        {rootFolders.map((folder) => (
          <div className="folder" key={folder.id}>
            <FileOrFolder file={folder} toggleFolder={toggleFolder} />
            <ul>
              {folder.children &&
                folder.children.length > 0 &&
                folder.children.map((subFolder) => (
                  <>
                    <li key={subFolder.id}>
                      <FileOrFolder
                        file={subFolder}
                        toggleFolder={toggleFolder}
                      />
                    </li>
                    {
                      <ul>
                        {subFolder.children &&
                          subFolder.children.length > 0 &&
                          subFolder.children.map((folder) => (
                            <li key={folder.id}>
                              <FileOrFolder
                                file={folder}
                                toggleFolder={toggleFolder}
                              />
                            </li>
                          ))}
                      </ul>
                    }
                  </>
                ))}
            </ul>
          </div>
        ))}
      </div>
    </>
  );
}
