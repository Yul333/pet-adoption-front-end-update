import React, { useContext } from "react";
import { Button, Form, Grid, Message, Segment } from "semantic-ui-react";
import { editAccount } from "../lib/api";
import { setUserTokenContext } from "../context/UserAuth";
import axios from "axios";

const INITIAL_USER = {
	firstName: "",
	lastName: "",
	password: "",
	phoneNumber: "",
	bio: "",
};

function Account() {
	const { token, user: userFromCtx } = useContext(setUserTokenContext);

	console.log();

	const [user, setUser] = React.useState({ ...INITIAL_USER, ...userFromCtx });

	const [disabled, setDisabled] = React.useState(true);
	const [loading, setLoading] = React.useState(false);
	const [error, setError] = React.useState("");

	async function handleSubmit(event) {
		event.preventDefault();

		const userInfo = {
			firstName: user.firstName,
			lastName: user.lastName,
			password: user.password,
			phoneNumber: user.phoneNumber,
			bio: user.bio,
		};
		console.log(user);
		console.log(userFromCtx);
		try {
			console.log("start loading");
			setLoading(true);
			setError("");
			console.log("start sending");
			const user = await editAccount(userFromCtx._id, userInfo, token);
			console.log("finish sending");
			console.log(user);
			setLoading(false);
		} catch (error) {
			setError("Something wrong...");
		} finally {
			setLoading(false);
		}
	}

	function handleChange(event) {
		const { name, value } = event.target;
		console.log(name, value);
		setUser({ ...user, [name]: value });
	}

	return (
		<>
			<Message
				attached
				icon="settings"
				header="Profile settings"
				content="Manage your settings"
				color="teal"
			/>
			<Form error={Boolean(error)} loading={loading} onSubmit={handleSubmit}>
				<Message error header="Oops!" content={error} />
				<Segment style={{ padding: "3em 0em" }} vertical>
					<Grid stackable>
						<Grid.Column width={13}>
							<Form.Input
								fluid
								icon="user"
								iconPosition="left"
								label="First Name"
								placeholder="First Name"
								name="firstName"
								defaultValue={user.firstName}
								onChange={handleChange}
							/>
							<Form.Input
								fluid
								icon="user"
								iconPosition="left"
								label="Last Name"
								placeholder="Last Name"
								name="lastName"
								defaultValue={user.lastName}
								onChange={handleChange}
							/>

							<Form.Input
								fluid
								icon="lock"
								iconPosition="left"
								label="Password"
								placeholder="Password"
								name="password"
								type="password"
								defaultValue={user.password}
								onChange={handleChange}
							/>

							<Form.Input
								fluid
								control="input"
								icon="phone square"
								iconPosition="left"
								label="Phone Number"
								placeholder="Phone Number"
								name="phoneNumber"
								type="number"
								defaultValue={user.phoneNumber}
								onChange={handleChange}
							/>
							<Form.Input
								fluid
								icon="address card"
								iconPosition="left"
								label="Short Bio"
								placeholder="Short Bio"
								name="bio"
								type="Short Bio"
								defaultValue={user.bio}
								onChange={handleChange}
							/>
							<Button
								icon="signup"
								type="submit"
								color="orange"
								content="Save Changes"
							/>
						</Grid.Column>
					</Grid>
				</Segment>
			</Form>
		</>
	);
}

export default Account;
