import React, { useState, useEffect } from "react";
import "./App.css";

const App = () => {
	const fetchUserIds = async () => {
		return ["john.smith", "sara.lee", "jack.ma"];
	};

	const checkStatus = async (userId) => {
		return Math.random() > 0.8
			? { status: "offline", id: userId }
			: { status: "online", id: userId };
	};

	const sendEmail = async (userId) => {
		// return if it was sucessfull or not
		return Math.random() > 0.1 ? true : false;
	};

	const [users, setUsers] = useState();
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const userConstruction = async () => {
			const arrayUserID = await fetchUserIds();
			let tempArrayObj = [];

			await Promise.all(
				arrayUserID.map(async (item) => {
					const { status } = await checkStatus(item);
					const sendedEmail = await sendEmail();

					tempArrayObj.push({
						name: item,
						status: status,
						sendedEmail: sendedEmail,
					});
				})
			);

			const filteredObject = tempArrayObj.filter(
				(item) => item["status"] === "online" && item["sendedEmail"] === true
			);

			setUsers(filteredObject);

			setIsLoading(false);
		};

		userConstruction();
	}, []);

	/*
    Question 1: 
    Find all online users and send them emails. Render the users for which the emails were successfully sent

    Step 1: Load users
    Step 2: Check users online
    Step 3: Send email for whom are online
    Step 4: Render those which the email was successfully sent
  
  */

	return (
		<div className="App">
			<div className="App-header">
				<div>
					All online users that introductions were sucessfully sent
					<ul>
						{!isLoading &&
							users.map((item) => <li key={item.name}>{item.name}</li>)}
					</ul>
				</div>
			</div>
		</div>
	);
};

export default App;
