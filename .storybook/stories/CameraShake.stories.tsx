import * as React from 'react'
import * as THREE from 'three'
import { useFrame } from 'react-three-fiber'

import { Setup } from '../Setup'

import { CameraShake, ShakeConfigPartial, OrbitControls, Box, Plane } from '../../src'

export default {
  title: 'Camera/CameraShake',
  component: CameraShake,
  decorators: [
    (storyFn) => (
      <Setup cameraPosition={new THREE.Vector3(0, 3, 10)} controls={false}>
        {storyFn()}
      </Setup>
    ),
  ],
}

function Scene() {
  const cube = React.useRef<THREE.Mesh>()

  useFrame(() => {
    if (cube.current) {
      cube.current.rotation.x = cube.current.rotation.y += 0.01
    }
  })

  return (
    <>
      <Box position={[6, 2.5, -10]} args={[1, 5, 1]} material-color="hotpink" />
      <Box position={[-6, 4, -10]} args={[1, 8, 1]} material-color="hotpink" />

      <Box ref={cube} position-y={2} args={[2, 2, 2]} material-color="hotpink" />
      <gridHelper args={[40, 40, 40]} />
    </>
  )
}

function CameraShakeScene({ cfg }) {
  const cameraRig = React.useRef()

  return (
    <>
      <React.Suspense fallback={null}>
        <CameraShake config={cfg} ref={cameraRig} />
        <Scene />
      </React.Suspense>
    </>
  )
}

function CameraShakeWithOrbitScene({ cfg }) {
  return (
    <>
      <React.Suspense fallback={null}>
        <OrbitControls />
        <CameraShake config={cfg} additive />
        <Scene />
      </React.Suspense>
    </>
  )
}

const controlsConfig: ShakeConfigPartial = {
  maxYaw: 0.025,
  maxPitch: 0.025,
  maxRoll: 0.025,
  yawFrequency: 0.8,
  pitchFrequency: 0.8,
  rollFrequency: 0.8,
}

export const CameraShakeSt = ({ ...args }) => <CameraShakeScene cfg={args} />
CameraShakeSt.storyName = 'Default'
CameraShakeSt.args = { ...controlsConfig }

export const CameraShakeWithOrbitSt = ({ ...args }) => <CameraShakeWithOrbitScene cfg={args} />
CameraShakeWithOrbitSt.storyName = 'With OrbitControls'
CameraShakeWithOrbitSt.args = { ...controlsConfig }
