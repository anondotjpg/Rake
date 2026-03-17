import { useWallet } from '@solana/wallet-adapter-react';
import { useWalletModal } from '@solana/wallet-adapter-react-ui';
import React from 'react';
import styled from 'styled-components';
import { useUserStore } from '../../hooks/useUserStore';

const WelcomeWrapper = styled.div`
  position: relative; /* needed for pseudo-element */
  background: #111111; /* Dark primary background */
  border-radius: 12px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  text-align: center;

  /* Shadows for depth */
  box-shadow:
    0 4px 3px rgba(0,0,0,.07),
    0 2px 2px rgba(0,0,0,.06);

  /* Pseudo-element for offset green ring */
  &::before {
    content: '';
    position: absolute;
    top: -4px;    /* offset outside */
    left: -4px;
    right: -4px;
    bottom: -4px;
    border-radius: 16px; /* slightly larger than main border-radius */
    border: 1px solid #1AA260; /* secondary green ring */
    z-index: -1; /* behind main content */
  }

  @media (min-width: 800px) {
    display: grid;
    grid-template-columns: 2fr 1fr; /* Text left, tagline right */
    align-items: center;
    text-align: left;
    padding: 40px;
    gap: 40px;
  }
`;

const WelcomeContent = styled.div`
  h1 {
    font-size: 1.75rem;
    margin: 0 0 8px 0;
    color: #ffffff;
  }

  p {
    font-size: 1rem;
    color: #ffffffd1;
    margin: 0;
  }

  @media (min-width: 800px) {
    h1 {
      font-size: 2.25rem;
    }
    p {
      font-size: 1.125rem;
    }
  }
`;

const Tagline = styled.div`
  font-weight: bold;
  font-size: 1.25rem;
  color: #ffffff;
  text-align: center;

  @media (min-width: 800px) {
    text-align: right;
    font-size: 1.75rem;
  }
`;

export function WelcomeBanner() {
  const wallet = useWallet();
  const walletModal = useWalletModal();
  const { set: setUserModal } = useUserStore();

  const handleCopyInvite = () => {
    setUserModal({ userModal: true });
    if (!wallet.connected) {
      walletModal.setVisible(true);
    }
  };

  return (
    <WelcomeWrapper>
      <WelcomeContent>
        <h1>Beat the Odds</h1>
        <p>Rake is your best chance, literally.</p>
      </WelcomeContent>

      <Tagline>
        On-chain. Fair. Decentralized.
      </Tagline>
    </WelcomeWrapper>
  );
}