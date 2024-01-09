export interface TrackProps {
  name: string;
  artist: string;
  album: string;
  id: string;
}

const Track = ({name, artist, album, id}: TrackProps) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', margin: 0, border: '1px solid gray'}} key={id}>
      <p style={{ textAlign: 'center', fontWeight: 'bold'}}>{name}</p>
      <div style={{display: 'flex', justifyContent: 'flex-start', gap: 2, paddingLeft: '2%'}}>
        <p style={{ fontWeight: 'lighter', padding: '1%', borderRight: '1px solid gray'}}>{album}</p>
        <p style={{ fontWeight: 'lighter', padding: '1%'}}>{artist}</p>
      </div>
    </div>
  )
}

export default Track;