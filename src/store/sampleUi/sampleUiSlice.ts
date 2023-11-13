import { createSlice } from '@reduxjs/toolkit';

interface sampleUIState {
  isDateModalOpen: boolean;
}

// Slice
export const sampleUiSlice = createSlice({
  name: 'sampleUi',
  initialState: {
    isDateModalOpen: false,
  } as sampleUIState,
  reducers: {
    onOpenDateModal: state => {
      state.isDateModalOpen = true;
    },
    onCloseDateModal: state => {
      state.isDateModalOpen = false;
    },
  },
});

// Actions creators
export const { onOpenDateModal, onCloseDateModal } = sampleUiSlice.actions;
