export default function FileOrFolder({ file, toggleFolder, expand }) {
  const { name, isDir } = file;
  const folderIcon = expand ? (
    <i className="fa-regular fa-folder-open" />
  ) : (
    <i className="fa-regular fa-folder" />
  );
  return (
    <div className="folder">
      {isDir ? (
        <button onClick={toggleFolder}>{folderIcon}</button>
      ) : (
        <i className="fa-solid fa-file"></i>
      )}
      <span>{name}</span>
    </div>
  );
}
