import './FilterDropdown.css';

export default function FilterDropdown(props) {
  function myFunction() {
    document.getElementById('dropItDown').classList.toggle('show');
  }

  window.onclick = (event) => {
    if (!event.target.matches('.dropButton')) {
      var dropdowns = document.getElementsByClassName('dropdown-content');
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('showF')) {
          openDropdown.classList.remove('showF');
        }
      }
    }
    if (!event.target.matches('.navdropbtn')) {
      var navdropdowns = document.getElementsByClassName('navdropdown-content');

      var j;
      for (j = 0; j < navdropdowns.length; j++) {
        var openNavDropdown = navdropdowns[j];
        if (openNavDropdown.classList.contains('showMe')) {
          openNavDropdown.classList.remove('showMe');
        }
      }
    }
  };

  return (
    <div className='filter-dropdown'>
      <button
        onClick={myFunction}
        className={`dropButton ${props.title.class}`}
      >
        {props.title.name}
      </button>
      <div id='dropItDown' className='filter-dropdown-content'>
        {props.items.map((item, index) => (
          <li key={index} onClick={item.function} className='clickable'>
            {item.name}
          </li>
        ))}
      </div>
    </div>
  );
}
