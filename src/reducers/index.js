import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import authReducer from './auth_reducer';
import retrievePassReducer from './retrievePass_reducer';
import makeRetrievePassReducer from './retrievePass_reducer';
import giftReducer from './giftReducer';
import giftsReducer from './giftsReducer';
import themesReducer from './themeReducer';
import extratoReducer from './extratoReducer';
import notificarReducer from './notificarReducer';
import notificacaoAdminReducer from './notificacaoAdminReducer';
import eventReducer from './eventsReducer';
import eventsReducerAdmin from './eventsReducerAdmin';
import categoriesReducer from './categoriesReducer';
import homeReducer from './homeReducer';
import pageReducer from './pageReducer';
import filterByCategoryReducer from './filterByCategoryReducer';
import cartReducer from './cartReducer';
import getEventReducer from './getEventReducer';
import financialReducer from './financialReducer';
import financialResumeReducer from './financialResumeReducer';
import getCartReducer from './getCartReducer';
import parcelReducer from './parcelReducer';
import themeConfigurationsReducer from './themeConfigurationsReducer';
import checkoutCartReducer from './checkoutCartReducer';
import checkoutBilletReducer from './checkoutBilletReducer';
import confirmPresenceReducer from './confirmPresenceReducer';
import invitedReducer from './invitedReducer';
import listGroupsReducer from './listGroupsReducer';
import giftCategoriesReducer from './giftCategoriesReducer';
import usersReducer from './usersReducer';
import viewsReducer from './viewsReducer';
import eventsByUserReducer from './eventsByUserReducer';
import notificationsUserReducer from './notificationsUserReducer';
import usersOrganizerReducer from './usersOrganizerReducer';
import deleteUsersReducer from './deleteUsersReducer';
import editUserReducer from './editUserReducer';
import setSlugReducer from './setSlugReducer';
import editInvitedReducer from './editInvitedReducer';
import giftEventReducer from './giftEventReducer';
import resumeFinancialReducer from './resumeFinancialReducer';
import taxReducer from './taxReducer';
import salutationReducer from './salutationReducer';
import salutationActiveReducer from './salutationActiveReducer';
import eventOrganizerReducer from './eventOrganizerReducer';
import listGiftsReducer from './listGiftsReducer';
import getUserReducer from './getUserReducer';
import editEventReducer from './editEventReducer';
import pictureUserReducer from './pictureUserReducer';
import addBankReducer from './addBankReducer';
import getBankReducer from './getBankReducer';
import setBankDefaultReducer from './setBankDefaultReducer';
import editBankReducer from './editBankReducer';
import deleteBankReducer from './deleteBankReducer';
import setRsvpReducer from './setRsvpReducer';
import getInviteReducer from './getInviteReducer';
import addGiftReducer from './addGiftReducer';
import allGiftsEventReducer from './allGiftsEventReducer';

const rootReducer = combineReducers({
  form: formReducer,
  auth: authReducer,
  // gift: giftReducer,
  gifts: giftReducer,
  themes: themesReducer,
  events: eventReducer,
  eventsAdmin: eventsReducerAdmin,
  home: homeReducer,
  page: pageReducer,
  retrievePass: retrievePassReducer,
  makeRetrievePass: makeRetrievePassReducer,
  filterByCategory: filterByCategoryReducer,
  cart: cartReducer,
  getEvent: getEventReducer,
  getCart: getCartReducer,
  parcel: parcelReducer,
  themeConfigurations: themeConfigurationsReducer,
  checkoutCart: checkoutCartReducer,
  checkoutBillet: checkoutBilletReducer,
  themeCategories: categoriesReducer,
  financial: financialReducer,
  financialResume: financialResumeReducer,
  extrato: extratoReducer,
  notificar: notificarReducer,
  confirmPresence: confirmPresenceReducer,
  invited: invitedReducer,
  usersCount: usersReducer,
  viewsCount: viewsReducer,
  notificacaoAdminReducer: notificacaoAdminReducer,
  listGroups: listGroupsReducer,
  giftCategories: giftCategoriesReducer,
  eventsByUser: eventsByUserReducer,
  notificationsUser: notificationsUserReducer,
  usersOrganizer: usersOrganizerReducer,
  deleteUsers: deleteUsersReducer,
  editUser: editUserReducer,
  setSlug: setSlugReducer,
  editInvited: editInvitedReducer,
  giftEvent: giftEventReducer,
  resumeFinancial: resumeFinancialReducer,
  tax: taxReducer,
  salutation: salutationReducer,
  salutationActive: salutationActiveReducer,
  eventOrganizer: eventOrganizerReducer,
  listGifts: listGiftsReducer,
  user: getUserReducer,
  editEvent: editEventReducer,
  pictureUser: pictureUserReducer,
  addBank: addBankReducer,
  getBankUser: getBankReducer,
  bankDefault: setBankDefaultReducer,
  editBank: editBankReducer,
  deleteBank: deleteBankReducer,
  setRsvp: setRsvpReducer,
  getInvite: getInviteReducer,
  addGift: addGiftReducer,
  allGifts: allGiftsEventReducer
});

export default rootReducer;
