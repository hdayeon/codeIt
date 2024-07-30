"use client";
import React from "react";
import * as S from "../styles/header";
import Link from "next/link";

const Header: React.FC = () => {
  return (
    <S.HeaderLayout>
      <S.HeaderBox>
        <Link href="/">
          <S.LogoBox />
        </Link>
      </S.HeaderBox>
    </S.HeaderLayout>
  );
};

export default Header;
