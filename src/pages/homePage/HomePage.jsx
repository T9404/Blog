const HomePage = () => {
    console.log(localStorage.getItem('token'));
    return (
        <div>
            <h1>Home Page</h1>
        </div>
    );
}

export default HomePage;