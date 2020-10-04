in vec3 vPosition;
in vec3 vNormal;
uniform vec3 uLightDirection;
uniform vec3 uLightColor;
            
void main() {
    vec3 finalColor = max(0., dot(vNormal, -uLightDirection)) * vec3(1., 0., 0.);
    gl_FragColor = vec4(finalColor, 1.);
}