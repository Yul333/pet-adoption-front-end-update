import {
	BrowserRouter as Router,
	Redirect,
	Route,
	Switch,
} from "react-router-dom";
import Account from "../components/Account";
import AllPets from "../components/All Pets";
import SearchAFriend from "../components/PetSearch/SearchAFriend";
import SignUp from "../components/SignUp";
import UserAuth from "../context/UserAuth";
import AddAPet from "../pages/AddAPet";
import Home from "../pages/Home";
import MyPets from "../pages/MyPets";
import Pet from "../pages/Pet";
import MainNavigation from "./MainNavigation";

function Header() {
	return (
		<UserAuth>
			<Router>
				<MainNavigation />
				<Switch>
					<Route path="/" exact>
						<Home />
					</Route>{" "}
					<Route path="/myPetsPage" exact>
						<MyPets />
					</Route>
					<Route path="/SearchAFriend" exact>
						<SearchAFriend />
						{/* <searchAFriend /> */}
					</Route>
					<Route path="/AllPets" exact>
						<AllPets />
					</Route>
					<Route path="/account" exact>
						<Account />
					</Route>
					<Route path="/AddAPet" exact>
						<AddAPet />
					</Route>
					<Route path="/Pet" exact>
						<Pet />
					</Route>
					<Route path="/SignUp" exact>
						<SignUp />
					</Route>
					<Redirect to="/" />
				</Switch>{" "}
			</Router>
		</UserAuth>
	);
}

export default Header;
