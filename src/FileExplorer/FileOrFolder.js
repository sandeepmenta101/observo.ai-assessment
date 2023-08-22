export default function FileOrFolder({ file, toggleFolder }) {
  const { name, isActive, isDir } = file;
  const folderIcon = isActive ? (
    <i className="fa-regular fa-folder-open" />
  ) : (
    <i className="fa-regular fa-folder" />
  );
  return (
    <div className="file" onClick={() => toggleFolder(file)}>
      {isDir ? (
        <button>{folderIcon}</button>
      ) : (
        <i className="fa-solid fa-file"></i>
      )}
      <span>{name}</span>
    </div>
  );
}
