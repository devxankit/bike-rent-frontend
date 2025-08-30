import React from 'react'
import Navbar from '../../components/Navbar'
import TexiBookingForm from '../../components/texi-components/texi-BookingFrom'
import GoogleMapsLoader from '../../components/texi-components/GoogleMapsLoader'

const TexiHome = () => {
  return (
    <>
      <GoogleMapsLoader />
      <Navbar />
      <TexiBookingForm />
    </>
  )
}

export default TexiHome