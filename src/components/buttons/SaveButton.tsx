interface SaveButtonProps {
  handleSavePlaylist: () => void;
}

const SaveButton = ({ handleSavePlaylist }: SaveButtonProps) => {
  return (
    <button
      style={{ width: '60%', alignSelf: 'center' }}
      onClick={handleSavePlaylist}
    >
      Save to Spotify
    </button>
  );
};

export default SaveButton;
