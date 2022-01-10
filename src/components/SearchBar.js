import SearchLogo from '../images/search-logo.svg';

const SearchBar = ( {handleSubmit, handleChange }) => {
    return(
        <div className='input-container'>
            <img className="search-logo" src={SearchLogo} alt="Search logo"/>
            <form onSubmit={handleSubmit}>
                <input type="text" onChange={handleChange}/>
            </form>
        </div>
    )
}

export default SearchBar;

