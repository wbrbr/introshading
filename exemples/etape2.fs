in vec3 vPosition;
in vec3 vNormal;
uniform vec3 uLightPos;
uniform vec3 uLightColor;
            
void main() {
    vec3 pl = uLightPos - vPosition;
    float d = length(pl);
    vec3 c = vec3(1., 0., 0.) * uLightColor * dot(vNormal, pl) / (d*d*d);
    gl_FragColor = vec4(c, 1.);
}