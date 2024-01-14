interface SaveButtonProps {
  handleSaveTracksToPlaylist: () => void;
}

const SaveButton = ({ handleSaveTracksToPlaylist }: SaveButtonProps) => {
  return (
    <button
      style={{ minWidth: '60%', alignSelf: 'center', margin: '1rem 0' }}
      onClick={handleSaveTracksToPlaylist}
    >
      Save to Spotify
    </button>
  );
};

export default SaveButton;
