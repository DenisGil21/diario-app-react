import { useEffect, useState } from "react";
import { firebase } from '../firebase/firebase-config';

import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom";
import { JournalScreen } from "../components/journal/JournalScreen";
import { AuthRouter } from "./AuthRouter";
import { useDispatch } from "react-redux";
import { login } from "../actions/auth";
import { PublicRoute } from "./PublicRoute";
import { PrivateRoute } from "./PrivateRoute";
import { startLoadingNotes } from "../actions/notes";

export const AppRouter = () => {

    const dispatch = useDispatch();

    const [checking, setChecking] = useState(true);

    const [isLoggetIn, setIsLoggetIn] = useState(false);

    useEffect(() => {

        firebase.auth().onAuthStateChanged(async(user) => {

            if (user?.uid) {
                dispatch(login(user.uid, user.displayName))
                setIsLoggetIn(true);

                dispatch(startLoadingNotes(user.uid));

            } else {
                setIsLoggetIn(false);
            }

            setChecking(false);
        });

    }, [dispatch, setChecking, setIsLoggetIn]);

    if (checking) {
        return (
            <h1>Espere...</h1>
        )
    }

    return (
        <div>
            <Router>
                <Routes>
                    <Route path="/auth/*" element={
                        <PublicRoute isAuthenticated={isLoggetIn}>
                            <AuthRouter />
                        </PublicRoute>
                    } />
                    <Route path="/" element={
                        <PrivateRoute isAuthenticated={isLoggetIn}>
                            <JournalScreen />
                        </PrivateRoute>} />
                    <Route path="*" element={<PublicRoute isAuthenticated={isLoggetIn} />} />
                </Routes>
            </Router>
        </div>
    );
};
