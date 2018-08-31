import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {
    token: string;

    constructor(private router: Router) { }

    signupUser(email: string, password: string) {
        firebase.auth().createUserAndRetrieveDataWithEmailAndPassword(email, password).catch((error) => {
            console.log('error :', error);
        })
    }

    signinUser(email: string, password: string) {
        firebase.auth().signInAndRetrieveDataWithEmailAndPassword(email, password).then((response) => {
            this.router.navigate(['/']);
            firebase.auth().currentUser.getIdToken().then((token: string) => {
                this.token = token;
            });
        }).catch((error) => {
            console.log('error :', error);
        });
    }

    logout() {
        firebase.auth().signOut();
        this.token = null;
    }

    getToken() {
        firebase.auth().currentUser.getIdToken().then((token: string) => {
            this.token = token;
        });
        return this.token;
    }

    isAuthenticated() {
        return this.token != null;
    }
}
