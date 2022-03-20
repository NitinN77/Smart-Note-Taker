import React from "react";
import type { NextPage } from "next";
import { getProviders, signIn, signOut } from "next-auth/react";

const SignUp = ({ providers }) => {
  return (
    <>
      <div className="sign-up-main">
        <div></div>
        <div className="sign-up-form">
          <h1 className="sign-up-header">Sign-in</h1>
          {/* <input type="text" placeholder='E-MAIL' className='sign-up-form-field'/>
                <br />
                <input type="password" placeholder='PASSWORD' className='sign-up-form-field'/>
                <br />
                <div className='sign-up-form-buttons'>                
                    <input type="submit" value={"LOGIN"} className='log-in-button'/> 
                    <input type='submit' value={"SIGN UP"} className='sign-up-button'/>
                </div> */}
          {Object.values(providers).map((provider: any) => (
            <div>
              <input
                type="submit"
                value={`Sign in with ${provider.name}`}
                className="sign-in-button"
                onClick={() => signIn(provider.id, {
                  callbackUrl: `${window.location.origin}/`,
                })}
              />
            </div>
          ))}
        </div>
        <div></div>
      </div>
    </>
  );
};

export async function getServerSideProps() {
  const providers = await getProviders();

  return {
    props: {
      providers,
    },
  };
}

export default SignUp;
