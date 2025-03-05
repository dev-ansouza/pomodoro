import Svg, { Path } from "react-native-svg";

export const IconPlay = () => {
    return (
        <Svg width="18" height="25" viewBox="0 0 11 14" fill="none">
            <Path d="M0.015625 0.015625L10.9844 7L0.015625 13.9844V0.015625Z" fill="black" />
        </Svg>
    )
}

export const IconPause = () => {
    return (
        <Svg width="18" height="25" viewBox="0 0 12 14" fill="none">
            <Path d="M8.01562 0.015625H12V13.9844H8.01562V0.015625ZM0 13.9844V0.015625H3.98438V13.9844H0Z" fill="black" />
        </Svg>
    )
}