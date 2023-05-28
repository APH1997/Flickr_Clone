// constants
const SET_USER = "session/SET_USER";
const REMOVE_USER = "session/REMOVE_USER";
const GET_USER_PAGE = "session/USER_PAGE";
const EDIT_USER = "session/EDIT_USER"

const setUser = (user) => ({
	type: SET_USER,
	payload: user,
});

const removeUser = () => ({
	type: REMOVE_USER,
});


export const authenticate = () => async (dispatch) => {
	const response = await fetch("/api/auth/", {
		headers: {
			"Content-Type": "application/json",
		},
	});
	if (response.ok) {
		const data = await response.json();
		if (data.errors) {
			return;
		}

		dispatch(setUser(data));
	}
};

export const login = (email, password) => async (dispatch) => {
	const response = await fetch("/api/auth/login", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			email,
			password,
		}),
	});

	if (response.ok) {
		const data = await response.json();
		dispatch(setUser(data));
		return null;
	} else if (response.status < 500) {
		const data = await response.json();
		if (data.errors) {
			return data.errors;
		}
	} else {
		return ["An error occurred. Please try again."];
	}
};

export const logout = () => async (dispatch) => {
	const response = await fetch("/api/auth/logout", {
		headers: {
			"Content-Type": "application/json",
		},
	});

	if (response.ok) {
		dispatch(removeUser());
	}
};

export const signUp = (username, email, password, first_name, last_name) => async (dispatch) => {
	const response = await fetch("/api/auth/signup", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			username,
			email,
			password,
			first_name,
			last_name
		}),
	});

	if (response.ok) {
		const data = await response.json();
		dispatch(setUser(data));
		return null;
	} else if (response.status < 500) {
		const data = await response.json();
		if (data.errors) {
			return data.errors;
		}
	} else {
		return ["An error occurred. Please try again."];
	}
};

//VISITNG A USER PAGE
const getProfileAction = (user) => ({
	type: GET_USER_PAGE,
	payload: user
})

export const getProfileThunk = (userId) => async (dispatch) => {
	const response = await fetch(`/api/users/${userId}`)

	if (response.ok) {
		const data = await response.json();
		dispatch(getProfileAction(data));
		return
	}
}
//EDIT USER PAGE
const updateProfileAction = (user) => ({
	type: EDIT_USER,
	payload: user
})

export const updateBioThunk = (bio, userId) => async (dispatch) => {
	console.log("ENTERED THE THUNK")
	const response = await fetch(`/api/users/${userId}/bio/edit`,{
		method: "PUT",
		headers: {"Content-Type": "application/json"},
		body: JSON.stringify(bio)
	})
	if (response.ok){
		const user = await response.json()
		console.log("THUNK FETCH RESPONSE:", user)
		await dispatch(updateProfileAction(user))
	}
}

export const updateProfileThunk = (formData, userId) => async (dispatch) => {
	const response = await fetch(`/api/users/${userId}/edit`,{
		method: "PUT",
		body: formData
	})

	if (response.ok){
		const user = await response.json()
		await dispatch(updateProfileAction(user))
	}
}


const initialState = { user: null, profilePageUser: null };
export default function reducer(state = initialState, action) {
	switch (action.type) {
		case SET_USER:
			return { user: action.payload };
		case REMOVE_USER:
			return { user: null };
		case GET_USER_PAGE: {
			const newState = {user: {...state.user}, profilePageUser: {...state.profilePageUser}}
			newState.profilePageUser = action.payload
			return newState
		}
		case EDIT_USER: {
			const newState = {user: action.payload, profilePageUser: action.payload}
			return newState
		}
		default:
			return state;
	}
}
