import { defineStore } from 'pinia'
import { db } from '../firebase'
import { collection, getDocs } from "firebase/firestore"



export const useFilterStore = defineStore('filter', {
  state: () => (
    { 
      userIdList: [], 
      statuses: [], 
      roles: [], 
  }),
  actions: {
    async getUserIdList () {
      const querySnapshot = await getDocs(collection(db, "users"));
      querySnapshot.forEach((doc) => {
        this.userIdList.push(doc.data())
      });
    },
    async getStatusList () {
      const querySnapshot = await getDocs(collection(db, "user-status"));
      querySnapshot.forEach((doc) => {
        this.statuses.push(doc.data())
      });
      console.log(this.userIdList, 'status----')
    },
    async getRoleList () {
      const querySnapshot = await getDocs(collection(db, "roles"));
      querySnapshot.forEach((doc) => {
        this.roles.push(doc.data())
      });
      console.log(this.userIdList, 'role----')
    }
  },
})
