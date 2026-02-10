"use client";

import { Suspense, useEffect} from "react";
import Link from "next/link";


export default function IndexPage() {

  return (
    <Suspense>
      <Link href="/login">Ir para Login</Link>
      <br/>
      <Link href="/calculadora">Ir para a Calculadora</Link>
    </Suspense> 

  );
}
