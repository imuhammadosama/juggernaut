export default function Modal({ closeModal }) {
  return (
    <div
      className='modal-background flex flex-item'
      onClick={() => closeModal(false)}
    >
      <div className='modal-container'>
        <iframe
          width='1084'
          height='610'
          src='https://www.youtube.com/embed/aqz-KE-bpKQ'
          title='YouTube video player'
          frameborder='0'
          allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
          allowfullscreen
        ></iframe>
      </div>
    </div>
  );
}
