// Libraries
import React, { Component, Fragment, useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// Style sheet
import "./styles/App.scss";
// Helpers
import useApplicationData from "../hooks/useApplicationData";
import BuyContext from "./BuyContext";
import SelectContext from "./SelectContext";
//Pages
import DashboardPage from "../pages/DashboardPage";
import InventoryPage from "../pages/InventoryPage";
import PetShopPage from "../pages/PetShopPage";
import DailyChallengesPage from "../pages/DailyChallengesPage";

import QuestionsContext from "./QuestionsContext";
import LandingPage from "../pages/LandingPage";

// Questionnaire
import QuestionsForm from "../pages/QuestionsForm";
import QuestionActiveMin from "../pages/QuestionActiveMin";
import ChallengeContext from "./ChallengeContext";
import useStatData from "../hooks/useStatData";
import ChallengeAlert from "./ChallengeAlert";
import ScrollTop from "react-scrolltop-button";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";


import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

const theme = createMuiTheme({
	// palette: {
	// 	primary: {
	// 		main: "#3f51b5",
	// 	},
  //   third: {
	// 		main: "#20B2AA",
	// 	}
	// },
	typography: {
		fontFamily: [
			"Quicksand",
			"Montserrat",
		].join(","),

	},
	h2: "Quicksand",

});
export default function App() {
	const {
		state,
		buydigitalpet,
		selectdigitalpet,
		updateDailyChall,
		acceptChallenge,
		taskcompleted,
		bonustaskcompleted,
	} = useApplicationData();

	const { status } = useStatData();
	const challengeContext = {
		state,
		status,
		taskcompleted,
		bonustaskcompleted,
	};
	const [trigger, SetTrigger] = useState(false);
	useEffect(() => {
		setTimeout(() => {
			SetTrigger(true);
		}, 50000);
	}, []);

	return (
		<Fragment>
			<Router>
				<ThemeProvider theme={theme}>
				<ChallengeAlert
					state={state}
					acceptChallenge={acceptChallenge}
					trigger={trigger}
					SetTrigger={SetTrigger}
				/>
				</ThemeProvider>
				<Switch>
					<Route exact path="/" component={LandingPage}>
						<LandingPage />
					</Route>
					<Route exact path="/Dashboard" component={DashboardPage}>
						<DashboardPage
							state={state}
							Activepet={state.ActivePet}
							status={status}
							acceptChallenge={acceptChallenge}
						/>
					</Route>
					<Route exact path="/mypetinventory" component={InventoryPage}>
						<SelectContext.Provider value={selectdigitalpet}>
						<ThemeProvider theme={theme}>
							<InventoryPage myPetInventory={state.MyPetInventory} />
							</ThemeProvider>
						</SelectContext.Provider>
					</Route>

					<Route exact path="/questionsform" component={QuestionsForm}>
						<QuestionsContext.Provider value={updateDailyChall}>
						<ThemeProvider theme={theme}>
							<QuestionsForm />
							</ThemeProvider>
						</QuestionsContext.Provider>
					</Route>
					<Route exact path="/questionactive" component={QuestionActiveMin}>
						<QuestionActiveMin />
					</Route>

					<Route exact path="/dailychallenges" component={DailyChallengesPage}>
						<ChallengeContext.Provider value={challengeContext}>
						<ThemeProvider theme={theme}>
							<DailyChallengesPage />
							</ThemeProvider>
						</ChallengeContext.Provider>
					</Route>

					<Route exact path="/petshop" component={PetShopPage}>
						<BuyContext.Provider value={buydigitalpet}>
						<ThemeProvider theme={theme}>
							<PetShopPage
								PetInventory={state.PetShop}
								coins={state.balanceCoins}
							></PetShopPage>
							</ThemeProvider>
						</BuyContext.Provider>
					</Route>
				</Switch>
			</Router>
			<ScrollTop
				text="Go to Top"
				distance={100}
				breakpoint={768}
				style={{ backgroundColor: "#3f51b5", color: "white", border: "none" }}
				// className="scroll-your-role"
				speed={1000}
				target={0}
				icon={<KeyboardArrowUpIcon />}
			/>
		</Fragment>
	);
}
