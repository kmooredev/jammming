interface SaveButtonProps {
  handleSavePlaylist: () => void;
}

const SaveButton = ({ handleSavePlaylist }: SaveButtonProps) => {
  return (
    <button
      style={{ minWidth: '60%', alignSelf: 'center', marginTop: '1rem' }}
      onClick={handleSavePlaylist}
    >
      Save to Spotify
    </button>
  );
};

export default SaveButton;
