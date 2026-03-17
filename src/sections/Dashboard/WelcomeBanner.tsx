import { useWallet } from '@solana/wallet-adapter-react';
import { useWalletModal } from '@solana/wallet-adapter-react-ui';
import DottedMap from 'dotted-map';
import React, { useMemo } from 'react';
import styled from 'styled-components';
import { useUserStore } from '../../hooks/useUserStore';

const WelcomeWrapper = styled.div`
  position: relative;
  background: #111111;
  border-radius: 12px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  text-align: center;
  overflow: hidden; /* clip the map to the rounded corners */

  box-shadow:
    0 4px 3px rgba(0,0,0,.07),
    0 2px 2px rgba(0,0,0,.06);

  &::before {
    content: '';
    position: absolute;
    top: -4px;
    left: -4px;
    right: -4px;
    bottom: -4px;
    border-radius: 16px;
    border: 1px solid #1AA260;
    z-index: -1;
  }

  @media (min-width: 800px) {
    display: grid;
    grid-template-columns: 2fr 1fr;
    align-items: center;
    text-align: left;
    padding: 40px;
    gap: 40px;
  }
`;

const MapBackground = styled.div`
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    opacity: 0.18; /* subtle: visible but never competing with text */
  }

  /* Fade the edges so the map blends into the dark background */
  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background:
      radial-gradient(ellipse at center, transparent 40%, #111111 100%),
      linear-gradient(to right, #111111 0%, transparent 15%, transparent 85%, #111111 100%);
  }
`;

const Content = styled.div`
  position: relative;
  z-index: 1;
  display: contents; /* lets children participate in the parent grid/flex */
`;

const WelcomeContent = styled.div`
  position: relative;
  z-index: 1;

  h1 {
    font-size: 1.75rem;
    margin: 0 0 7px 0;
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
  position: relative;
  z-index: 1;
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

  // Generate the dotted world map SVG once — memoised so it's not recomputed on every render
  const mapSvg = useMemo(() => {
    const map = new DottedMap({ height: 60, grid: 'diagonal' });

    return map.getSVG({
      radius: 0.35,
      color: '#1AA260',   // brand green dots
      shape: 'circle',
      backgroundColor: 'transparent', // let the wrapper's #111111 show through
    });
  }, []);

  return (
    <WelcomeWrapper>
      {/* Dotted map sits behind everything */}
      <MapBackground>
        <img
          src={`data:image/svg+xml;utf8,${encodeURIComponent(mapSvg)}`}
          alt=""
          aria-hidden="true"
        />
      </MapBackground>

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