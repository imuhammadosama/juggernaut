import './Modal.css';
export default function Modal({ closeModal, executeFunction, data }) {
  function handleClick() {
    executeFunction(data);
    closeModal(false);
  }
  return (
    <div className='modal-background flex flex-item bg-pending'>
      <div className='modal-container mx-144 unset-height relative'>
        <div className='modal-title py-16'>Cancel this load</div>
        <div className='py-16 px-32'>
          <p>Are you sure you want to delete this?</p>

          <div className='flex flex-item py-16 px-64'>
            <div className='pr-8'>
              <button className='primary-button' onClick={handleClick}>
                Yes
              </button>
            </div>
            <div>
              <button
                className='secondary-button'
                onClick={() => closeModal(false)}
              >
                No
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
