in vec3 Position;
in vec3 Normal;
uniform vec3 LightDirection;
uniform vec3 LightColor;
            
void main() {
    vec3 finalColor = max(0., dot(Normal, -LightDirection)) * vec3(1., 0., 0.);
    gl_FragColor = vec4(finalColor, 1.);
}