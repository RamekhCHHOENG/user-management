import { defineStore } from 'pinia'
import { auth, db } from '../firebase'
import { generateId } from '@/utils/ramdomId'
import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  updatePassword
} from 'firebase/auth'
import { 
  doc,
  getDocs,
  setDoc,
  collection,
  serverTimestamp,
  updateDoc,
  deleteDoc,
  query,
  // orderBy,
  // limit,
  // startAt,
  // startAfter, 
  // where
} from "firebase/firestore"


export const useUserStore = defineStore('users', {
  state: () => ({ 
    users: [],
    userCache: [],
    loading: false,

    // table: {
    //   currentPage: 1,
    //   pageSize: 10,
    //   sort: {
    //     prop: '',
    //     order: null
    //   },
    //   totalElements: 0
    // },
    // filters: {}
  }),
  actions: {
    async getUserList () {
      this.users = []
      this.loading = true

      const firstQueryRef = query(
        collection(db, "users"), 
        // orderBy(payload.sortBy[0] || 'name'),
        // limit(payload.itemsPerPage),
      )
      const documentSnapshots = await getDocs(firstQueryRef)

      // const lastVisible = documentSnapshots.docs[documentSnapshots.docs.length-1]
      // console.log(lastVisible)
      
      // const next = query(
      //   collection(db, "users"), 
      //   // orderBy(payload.sortBy[0] || 'name'),
      //   limit(payload.itemsPerPage),
      //   startAfter(lastVisible)
      // )

      // const querySnapshot = await getDocs(next)

      documentSnapshots.forEach((doc) => {
        this.users.push(doc.data())
      }) 

      this.userCache = this.users
      this.loading = false
    },
    async getFilterData (payload) {
      this.loading = true

      this.users = this.userCache

      if (payload.statusId || payload.roleId || payload.q) {
        this.users = this.users.filter(el => {
          return (!payload.q || (el.id.toLowerCase().search(payload.q.toLowerCase()) > -1
            || el.name.toLowerCase().search(payload.q.toLowerCase()) > -1))
            && (!payload.statusId || (el.status.id === payload.statusId))
            && (!payload.roleId || (el.role.id === payload.roleId))
        })
      }

      setTimeout(() => {
        this.loading = false
      }, 900)
    },
    async createUser (payload) {
      const {
        email,
        password,
      } = payload

      await createUserWithEmailAndPassword(auth, email, password)
        .then(() => {
          this.storUserData(payload)
        }).catch((error) => {
          throw(error)
        })

    },
    async storUserData (payload) {
      const {
        name,
        email,
        role,
        status,
        phoneNumber
      } = payload
      const uid = auth.currentUser.uid

      await setDoc(doc(db, "users", uid), {
        uid: uid,
        id: generateId(5),
        name: name,
        email: email,
        role: role,
        status: status,
        phoneNumber: phoneNumber || '',
        createdAt: serverTimestamp()
      }).then(() => {
        //create user
      }).catch((error) => {
        throw(error)
      })
    },
    async editUser (payload) {
      const {
        uid,
        name,
        email,
        role,
        status,
        phoneNumber
      } = payload

      const userRef = doc(db, "users", uid)

      await updateDoc(userRef, {
        name: name,
        email: email,
        role: role,
        status: status,
        phoneNumber: phoneNumber
      }).then(() => {
        // return
      }).catch((error) => {
        throw(error)
      })
      return false
    },
    async deleteUser (payload) {
      const { uid } = payload

      await deleteDoc(doc(db, 'users', uid))
        .then(() => {
          //Success delete a user
        }).catch((error) => {
          throw(error)
        })
    },
    async resetPassword (payload) {
      const { email } = payload

      await sendPasswordResetEmail(auth, email)
        .then(() => {
          // Success reset password
        }).catch((error) => {
          throw(error)
        })
    },
    async changePassword (payload) {
      const { newPassword } = payload
      const user = auth.currentUser

      await updatePassword(user, newPassword)
        .then(() => {
          // Success change password
        }).catch((error) => {
          throw(error)
        })
    },
  },
})
