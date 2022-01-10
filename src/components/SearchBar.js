import SearchIcon from '../images/search-icon.svg';

const SearchBar = ( {handleSubmit, handleChange }) => {
    return(
        <div className='input-container'>
            <img className="search-logo" src={SearchIcon} alt="Search Icon"/>
            <form onSubmit={handleSubmit}>
                <input type="text" onChange={handleChange}/>
            </form>
        </div>
    )
}

export default SearchBar;

