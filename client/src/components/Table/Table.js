import './Table.css';

export default function Table({
  page,
  loading,
  items,
  names,
  titles,
  buttons,
  selectedItem,
  setItem,
  search,
  actions,
}) {
  if (loading) return <h1>Loading</h1>;

  return (
    <table>
      <thead>
        <tr>
          {titles.map((title, index) => (
            <th key={index}>{title}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {items.map((item) => (
          <tr
            className={
              selectedItem._id === item._id ? 'selected' : 'not-selected'
            }
            onClick={() => {
              setItem(item);
            }}
            key={item._id}
          >
            <td>{item[names[0]]}</td>
            {page === 'users' ? (
              <td>
                <span className='id-tag'>{item[names[1]]}</span>
              </td>
            ) : (
              <td>{item[names[1]]}</td>
            )}
            <td>{item[names[2]]}</td>
            <td>{item[names[3]]}</td>
            <td>{item[names[4]]}</td>
            <td>{item[names[5]]}</td>
            <td>{item[names[6]]}</td>
            {actions ? (
              <td>
                {actions.map((button, index) => (
                  <a
                    className={button.class}
                    onClick={button.onClick(item)}
                    key={index}
                  >
                    {button.name}
                  </a>
                ))}
              </td>
            ) : (
              ''
            )}
            {buttons ? (
              <td>
                {buttons.map((button, index) => (
                  <button
                    className={button.class}
                    onClick={() => button.onClick(item)}
                    key={index}
                  >
                    {button.name}
                  </button>
                ))}
              </td>
            ) : (
              ''
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
