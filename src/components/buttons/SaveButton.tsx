interface SaveButtonProps {
  handleSavePlaylist: () => void;
}

const SaveButton = ({ handleSavePlaylist }: SaveButtonProps) => {
  return (
    <button
      style={{ minWidth: '60%', alignSelf: 'center', margin: '1rem 0' }}
      onClick={handleSavePlaylist}
    >
      Save to Spotify
    </button>
  );
};

export default SaveButton;
