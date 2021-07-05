export const renderMobileSearchBar = ({ dropdownRef, handleNavbarSearchSubmit }) => {
    <div className="mobile-search-bar-container" ref={dropdownRef}>
        <form className="mobile-search-bar-form" onSubmit={handleNavbarSearchSubmit}>
            <input className="mobile-search-bar" id="search_input" type="text" name="search_input" placeholder="Search Retrobase..." ></input>
        </form>
    </div>
}