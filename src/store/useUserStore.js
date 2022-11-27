import { defineStore } from 'pinia'
import { db } from '../firebase'
import { collection, getDocs } from "firebase/firestore"



export const useUserStore = defineStore('users', {
  state: () => ({ users: [] }),
  actions: {
    async getUserList () {
        const querySnapshot = await getDocs(collection(db, "users"));
        querySnapshot.forEach((doc) => {
          this.users.push(doc.data())
        });
        console.log(this.users, 'here user data')
    }
  },
})
