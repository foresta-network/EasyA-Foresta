#![cfg_attr(not(feature = "std"), no_std, no_main)]

#[ink::contract]
mod camera {
    use ink::storage::Mapping;
    use ink::prelude::vec::Vec;

    #[derive(Debug, PartialEq, Eq)]
    #[ink::scale_derive(Encode, Decode, TypeInfo)]
    pub enum Error {
        CallerNotInAllowList,
        NotAdmin
    }

    pub type Result<T> = core::result::Result<T, Error>;

    #[ink(storage)]
    pub struct Camera {
        species: Mapping<u128, Vec<u8>>,
        species_count: Mapping<u128, u128>,
        allow_list: Mapping<AccountId, ()>,
        admin: Option<AccountId>,
    }

    impl Camera {

        #[ink(constructor)]
        pub fn new(admin: Option<AccountId>) -> Self {
            Self {
                species: Mapping::new(),
                species_count: Mapping::new(),
                allow_list: Mapping::new(),
                admin,
            }
        }

        #[ink(constructor)]
        pub fn default() -> Self {
            Self::new(None)
        }

        #[ink(message)]
        pub fn fulfill(&mut self, species_id: u128) -> Result<()> {
            if !self.allow_list.contains(self.env().caller()) {
                return Err(Error::CallerNotInAllowList);
            }

            let mut value: u128 = 0;

            if self.species_count.get(species_id).is_none() {
                value = 1;
            } else {
                value = self.species_count.get(species_id).unwrap().saturating_add(1);
            }

            self.species_count.insert(species_id,&value);

            Ok(())
        }

        #[ink(message)]
        pub fn allow(&mut self, account: AccountId) -> Result<()> {
            if let Some(admin) = self.admin {
                if self.env().caller() != admin {
                    return Err(Error::NotAdmin)
                }
            }
            self.allow_list.insert(account, &());
            Ok(())
        }

        #[ink(message)]
        pub fn add_species_metadata(&mut self, species_id: u128, metadata: Vec<u8>) -> Result<()> {
            if let Some(admin) = self.admin {
                if self.env().caller() != admin {
                    return Err(Error::NotAdmin)
                }
            }
            self.species.insert(species_id,&metadata);
            Ok(())
        }

        #[ink(message)]
        pub fn disallow(&mut self, account: AccountId) -> Result<()> {
            if let Some(admin) = self.admin {
                if self.env().caller() != admin {
                    return Err(Error::NotAdmin)
                }
            }
            self.allow_list.remove(account);
            Ok(())
        }

        #[ink(message)]
        pub fn get_species_count(&self, key: u128) -> Option<u128> {
            self.species_count.get(key)
        }

        #[ink(message)]
        pub fn get_species(&self, key: u128) -> Option<Vec<u8>> {
            self.species.get(key)
        }
    }

    #[cfg(test)]
    mod tests {
        /// Imports all the definitions from the outer scope so we can use them here.
        use super::*;

        /// We test if the default constructor does its job.
        #[ink::test]
        fn default_works() {
            let camera = Camera::default();
            assert_eq!(camera.get_species_count(Default::default()), None);
        }


        #[ink::test]
        fn fulfill_works() {
            let mut camera = Camera::new(None);
            assert_eq!(camera.get_species_count(Default::default()), None);
            camera.allow(AccountId::from([1; 32])).expect("can allow account");
            camera.fulfill(0).expect("fulfill works");
            assert_eq!(camera.get_species_count(0), Some(1));
            camera.fulfill(0).expect("fulfill works");
            assert_eq!(camera.get_species_count(0), Some(2));
        }
    }
}