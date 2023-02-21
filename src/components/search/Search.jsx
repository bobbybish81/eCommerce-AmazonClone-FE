import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { IoSearchOutline, IoClose } from 'react-icons/io5';
import './Search.css';

const Search = ({ setQuery, setCurrentPage, categories }) => {

  return (
      <Nav className='navbar'>
        <InputGroup className='search'>
          <InputGroup.Text id='basic-addon1'>
            <IoSearchOutline/>
          </InputGroup.Text>
          <Form.Control
            placeholder='Search'
            aria-label='Search'
            aria-describedby='basic-addon1'
            onClick={() => setCurrentPage(1)}
            onChange={(e) => setQuery(e.target.value)}
            style={{borderRight: 'none'}}
          />
          <InputGroup.Text
            id='basic-addon1'
            style={{backgroundColor: '#fff'}}
            onClick={()=> window.location.reload()}>
            <IoClose style={{color: 'grey'}}/>
          </InputGroup.Text>
        </InputGroup>
        <NavDropdown
            className='filter'
            title='Categories'
            id='basic-nav-dropdown'>
          {categories.map((category, index) => (
            <NavDropdown.Item
              key={index}
              style={{width: '12rem', color: 'grey'}}
              onClick={()=> {setQuery(category); setCurrentPage(1)}}>
                {category}
            </NavDropdown.Item>
            )
          )}
        </NavDropdown>
      </Nav>
  );
}

export default Search;